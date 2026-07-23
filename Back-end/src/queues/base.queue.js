import QueueInterface from '../interfaces/queue.interface.js';

export class BaseQueue extends QueueInterface {
  constructor(name, options = {}) {
    super();
    this.name = name;
    this.options = options;
    this.jobs = new Map();
    this.jobCounter = 0;
    this.handler = null;
  }

  generateJobId() {
    this.jobCounter += 1;
    return `${this.name}-${Date.now()}-${this.jobCounter}`;
  }

  async addJob(name, data = {}, options = {}) {
    const job = {
      id: options.id || this.generateJobId(),
      name,
      data,
      options,
      status: 'queued',
      createdAt: new Date().toISOString(),
      attempts: 0,
    };

    this.jobs.set(job.id, job);
    return job;
  }

  async getJob(jobId) {
    return this.jobs.get(jobId) || null;
  }

  async removeJob(jobId) {
    const job = this.jobs.get(jobId);
    if (job) {
      this.jobs.delete(jobId);
      return true;
    }

    return false;
  }

  async process(handler) {
    if (typeof handler !== 'function') {
      throw new Error('Queue processor must be a function.');
    }

    this.handler = handler;
    const jobs = Array.from(this.jobs.values());

    for (const job of jobs) {
      job.status = 'processing';
      try {
        const result = await handler(job);
        job.status = 'completed';
        job.result = result;
        this.jobs.delete(job.id);
      } catch (error) {
        job.status = 'failed';
        job.error = error.message;
        job.attempts += 1;
      }
    }

    return jobs;
  }
}

export default BaseQueue;

