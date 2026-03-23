using JobTracker.Api.Enums;

namespace JobTracker.Api.Models
{
    public class JobApplication
    {
        public int Id { get; set; }

        public string CompanyName { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

        public DateTime? InterviewDate { get; set; }

        public string? Notes { get; set; }

        public string? Location { get; set; }

        public string? JobUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser? User { get; set; }
    }
}