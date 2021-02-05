export interface CompanyOperations {
  operations: {
    production: boolean;
    transport: boolean;
    treatment: boolean;
    cache: boolean;
    disposal: boolean;
  };
  safeTrashOperations: {
    exists: boolean;
    production: boolean;
    transport: boolean;
    treatment: boolean;
    cache: boolean;
    disposal: boolean;
  };
  unsafeTrashOperations: {
    exists: boolean;
    production: boolean;
    transport: boolean;
    treatment: boolean;
    cache: boolean;
    disposal: boolean;
  };
}

export abstract class CompanyOperationsData {

}
