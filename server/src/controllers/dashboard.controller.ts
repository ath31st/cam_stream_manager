import type { Request, Response } from 'express';
import type { DashboardService } from '../services/dashboard.service';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor(dashboardService: DashboardService) {
    this.dashboardService = dashboardService;
  }

  getDashboardData = async (req: Request, res: Response) => {
    try {
      const dashboardData = await this.dashboardService.getDashboardData();
      res.status(200).json(dashboardData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          message: 'Failed to get dashboard data',
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Failed to get dashboard data',
          error: 'Unknown error occurred',
        });
      }
    }
  };
}
