using Microsoft.AspNetCore.Identity;

namespace JobTracker.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Optional: display name
        public string? FullName { get; set; }

        // Track when user registered
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property (VERY useful)
        public ICollection<JobApplication> JobApplications { get; set; } = new List<JobApplication>();
    }
}