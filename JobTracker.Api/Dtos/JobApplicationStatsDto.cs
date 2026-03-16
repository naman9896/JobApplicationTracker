namespace JobTracker.Api.Dtos
{
    public class JobApplicationStatsDto
    {
        public int TotalApplications { get; set; }
        public int Applied { get; set; }
        public int InterviewScheduled { get; set; }
        public int Rejected { get; set; }
        public int Offer { get; set; }
    }
}