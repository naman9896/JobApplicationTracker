using JobTracker.Api.Dtos;
using JobTracker.Api.Models;

namespace JobTracker.Api.Interfaces
{
    public interface IJobApplicationService
    {
        Task<PagedResultDto<JobApplication>> GetAllAsync(string? status, string? search, string? sortBy, int page, int pageSize);
        Task<JobApplication?> GetByIdAsync(int id);
        Task<JobApplicationStatsDto> GetStatsAsync();
        Task<IEnumerable<JobApplication>> GetUpcomingInterviewsAsync();
        Task<JobApplication> CreateAsync(CreateJobApplicationDto dto);
        Task<bool> UpdateAsync(int id, UpdateJobApplicationDto dto);
        Task<bool> DeleteAsync(int id);
    }
}