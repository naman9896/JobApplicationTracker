using JobTracker.Api.Dtos;
using JobTracker.Api.Models;

namespace JobTracker.Api.Interfaces
{
    public interface IJobApplicationService
    {
        Task<PagedResultDto<JobApplication>> GetAllAsync(
            string userId,
            string? status,
            string? search,
            string? sortBy,
            int page,
            int pageSize);

        Task<JobApplication?> GetByIdAsync(int id, string userId);

        Task<JobApplicationStatsDto> GetStatsAsync(string userId);

        Task<IEnumerable<JobApplication>> GetUpcomingInterviewsAsync(string userId);

        Task<JobApplication> CreateAsync(CreateJobApplicationDto dto, string userId);

        Task<bool> UpdateAsync(int id, UpdateJobApplicationDto dto, string userId);

        Task<bool> DeleteAsync(int id, string userId);
    }
}