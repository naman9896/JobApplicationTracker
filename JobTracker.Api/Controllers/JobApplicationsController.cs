using System.Security.Claims;
using JobTracker.Api.Dtos;
using JobTracker.Api.Interfaces;
using JobTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationService _service;

        public JobApplicationsController(IJobApplicationService service)
        {
            _service = service;
        }

        private string? GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResultDto<JobApplication>>> GetAll(
            [FromQuery] string? status,
            [FromQuery] string? search,
            [FromQuery] string? sortBy,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 5)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 5;

            var result = await _service.GetAllAsync(userId, status, search, sortBy, page, pageSize);
            return Ok(result);
        }

        [HttpGet("stats")]
        public async Task<ActionResult<JobApplicationStatsDto>> GetStats()
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var stats = await _service.GetStatsAsync(userId);
            return Ok(stats);
        }

        [HttpGet("interviews/upcoming")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetUpcomingInterviews()
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var interviews = await _service.GetUpcomingInterviewsAsync(userId);
            return Ok(interviews);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetById(int id)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var application = await _service.GetByIdAsync(id, userId);

            if (application == null)
            {
                return NotFound($"Job application with ID {id} not found.");
            }

            return Ok(application);
        }

        [HttpPost]
        public async Task<ActionResult<JobApplication>> Create(CreateJobApplicationDto dto)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var jobApplication = await _service.CreateAsync(dto, userId);

            return CreatedAtAction(nameof(GetById), new { id = jobApplication.Id }, jobApplication);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateJobApplicationDto dto)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var updated = await _service.UpdateAsync(id, dto, userId);

            if (!updated)
            {
                return NotFound($"Job application with ID {id} not found.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var deleted = await _service.DeleteAsync(id, userId);

            if (!deleted)
            {
                return NotFound($"Job application with ID {id} not found.");
            }

            return NoContent();
        }
    }
}