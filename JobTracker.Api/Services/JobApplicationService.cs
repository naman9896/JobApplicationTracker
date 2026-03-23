using JobTracker.Api.Data;
using JobTracker.Api.Dtos;
using JobTracker.Api.Enums;
using JobTracker.Api.Interfaces;
using JobTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.Api.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly AppDbContext _context;

        public JobApplicationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PagedResultDto<JobApplication>> GetAllAsync(
            string userId,
            string? status,
            string? search,
            string? sortBy,
            int page,
            int pageSize)
        {
            var query = _context.JobApplications
                .Where(j => j.UserId == userId)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(status) &&
                Enum.TryParse<ApplicationStatus>(status, true, out var parsedStatus))
            {
                query = query.Where(j => j.Status == parsedStatus);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                var searchLower = search.ToLower();

                query = query.Where(j =>
                    j.CompanyName.ToLower().Contains(searchLower) ||
                    j.Role.ToLower().Contains(searchLower));
            }

            query = sortBy?.ToLower() switch
            {
                "applieddateasc" => query.OrderBy(j => j.AppliedDate),
                "companyasc" => query.OrderBy(j => j.CompanyName),
                "companydesc" => query.OrderByDescending(j => j.CompanyName),
                _ => query.OrderByDescending(j => j.AppliedDate)
            };

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResultDto<JobApplication>
            {
                Items = items,
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
            };
        }

        public async Task<JobApplication?> GetByIdAsync(int id, string userId)
        {
            return await _context.JobApplications
                .FirstOrDefaultAsync(j => j.Id == id && j.UserId == userId);
        }

        public async Task<JobApplicationStatsDto> GetStatsAsync(string userId)
        {
            var applications = await _context.JobApplications
                .Where(j => j.UserId == userId)
                .ToListAsync();

            return new JobApplicationStatsDto
            {
                TotalApplications = applications.Count,
                Applied = applications.Count(j => j.Status == ApplicationStatus.Applied),
                InterviewScheduled = applications.Count(j => j.Status == ApplicationStatus.InterviewScheduled),
                Rejected = applications.Count(j => j.Status == ApplicationStatus.Rejected),
                Offer = applications.Count(j => j.Status == ApplicationStatus.Offer)
            };
        }

        public async Task<IEnumerable<JobApplication>> GetUpcomingInterviewsAsync(string userId)
        {
            var today = DateTime.UtcNow.Date;

            return await _context.JobApplications
                .Where(j =>
                    j.UserId == userId &&
                    j.InterviewDate.HasValue &&
                    j.InterviewDate.Value.Date >= today)
                .OrderBy(j => j.InterviewDate)
                .ToListAsync();
        }

        public async Task<JobApplication> CreateAsync(CreateJobApplicationDto dto, string userId)
        {
            var jobApplication = new JobApplication
            {
                CompanyName = dto.CompanyName,
                Role = dto.Role,
                Status = dto.Status,
                AppliedDate = dto.AppliedDate,
                InterviewDate = dto.InterviewDate,
                Notes = dto.Notes,
                Location = dto.Location,
                JobUrl = dto.JobUrl,
                UserId = userId
            };

            _context.JobApplications.Add(jobApplication);
            await _context.SaveChangesAsync();

            return jobApplication;
        }

        public async Task<bool> UpdateAsync(int id, UpdateJobApplicationDto dto, string userId)
        {
            var existingApplication = await _context.JobApplications
                .FirstOrDefaultAsync(j => j.Id == id && j.UserId == userId);

            if (existingApplication == null)
            {
                return false;
            }

            existingApplication.CompanyName = dto.CompanyName;
            existingApplication.Role = dto.Role;
            existingApplication.Status = dto.Status;
            existingApplication.AppliedDate = dto.AppliedDate;
            existingApplication.InterviewDate = dto.InterviewDate;
            existingApplication.Notes = dto.Notes;
            existingApplication.Location = dto.Location;
            existingApplication.JobUrl = dto.JobUrl;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            var application = await _context.JobApplications
                .FirstOrDefaultAsync(j => j.Id == id && j.UserId == userId);

            if (application == null)
            {
                return false;
            }

            _context.JobApplications.Remove(application);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}