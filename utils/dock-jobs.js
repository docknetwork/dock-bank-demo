import { apiGet } from "./request";
import { dockUrl } from "./constants";

/**
 * Gets a job by ID.
 * @param {string} id The ID of the job to get.
 * @returns {Promise<JobResult>} The job data.
 */
export async function getJob(id) {
    const result = await apiGet(
        `${dockUrl}/jobs/${id}`
    );
    return result.data;
}

/**
 * Waits for the given job to reach a finalized or error state.
 * Polls the job status every 2 seconds until it is no longer "processing".
 * Logs the final job response.
 * @param {string} jobId The ID of the job to wait for.
 * @returns {Promise<any>}
 */
export async function waitForJobCompletion(jobId) {
    let job = await getJob(jobId);

    if (!job) {
        throw new Error("Job is undefined");
    }

    console.log('job.status', job.status);

    while (job.status !== "finalized") {
        console.log(`waitForJobCompletion:while`, { job });
        if (job.status === "error") {
            throw new Error("Error on job completion, try again.");
        }
        await new Promise((resolve) => setTimeout(resolve, 4000));
        job = await getJob(jobId);
    }

    return job;
}
