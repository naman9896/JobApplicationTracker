using JobTracker.Api.Dtos;
using JobTracker.Api.Interfaces;
using JobTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationService _service;

        public JobApplicationsController(IJobApplicationService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResultDto<JobApplication>>> GetAll(
            [FromQuery] string? status,
            [FromQuery] string? search,
            [FromQuery] string? sortBy,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 5)
        {
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 5;

            var result = await _service.GetAllAsync(status, search, sortBy, page, pageSize);
            return Ok(result);
        }

        [HttpGet("stats")]
        public async Task<ActionResult<JobApplicationStatsDto>> GetStats()
        {
            var stats = await _service.GetStatsAsync();
            return Ok(stats);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var application = await _service.GetByIdAsync(id);

            if (application == null)
            {
                return NotFound($"Job application with ID {id} not found.");
            }

            return Ok(application);
        }

        [HttpPost]
        public async Task<ActionResult<JobApplication>> Create(CreateJobApplicationDto dto)
        {
            var jobApplication = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = jobApplication.Id }, jobApplication);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateJobApplicationDto dto)
        {
            var updated = await _service.UpdateAsync(id, dto);

            if (!updated)
            {
                return NotFound($"Job application with ID {id} not found.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound($"Job application with ID {id} not found.");
            }

            return NoContent();
        }

        [HttpGet("interviews/upcoming")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetUpcomingInterviews()
        {
            var interviews = await _service.GetUpcomingInterviewsAsync();
            return Ok(interviews);
        }
    }
}