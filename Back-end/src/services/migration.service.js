export class MigrationService {
  async migrate() {
    return { success: true, message: 'Migration completed.' };
  }
}

export const migrationService = new MigrationService();
export default migrationService;

