import type { IAdfectusService } from "./adfectus_service"
import type { IExternalService } from "./external_service"
import { MockAdfectusService } from "./mock_adfectus_service"
import { MockExternalService } from "./mock_external_service"

export const ExternalService: IExternalService = new MockExternalService()
export const AdfectusService: IAdfectusService = new MockAdfectusService()
