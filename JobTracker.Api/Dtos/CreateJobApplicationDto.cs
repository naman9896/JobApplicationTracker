using System.ComponentModel.DataAnnotations;
using JobTracker.Api.Enums;

namespace JobTracker.Api.Dtos
{
    public class CreateJobApplicationDto
    {
        [Required]
        [StringLength(100)]
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string Role { get; set; } = string.Empty;

        [Required]
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Applied;

        public DateTime AppliedDate { get; set; } = DateTime.UtcNow;

        public DateTime? InterviewDate { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }

        [StringLength(500)]
        public string? JobUrl { get; set; }
    }
}