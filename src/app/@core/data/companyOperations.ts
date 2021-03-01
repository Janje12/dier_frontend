export interface CompanyOperations {
  operations: {
    production: boolean;
    transport: boolean;
    collector: boolean;
    treatment: boolean;
    cache: boolean;
    disposal: boolean;
    specialWaste: boolean;
  };
  safeTrashOperations: {
    exists: boolean;
    production: boolean;
    transport: boolean;
    collector: boolean;
    treatment: boolean;
    cache: boolean;
    disposal: boolean;
  };
  unsafeTrashOperations: {
    exists: boolean;
    production: boolean;
    transport: boolean;
    collector: boolean;
    treatment: boolean;
    cache: boolean;
    disposal: boolean;
  };
  specialWasteOperations: {
    exists: boolean;
    production: boolean;
    import: boolean;
    export: boolean;
  };
}

export abstract class CompanyOperationsData {

}
