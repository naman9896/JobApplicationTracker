using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Job Tracker API is working!");
        }
    }
}