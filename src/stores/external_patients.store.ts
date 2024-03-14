import { getExternalPatients } from "#/services/external/patients.service"
import { createLoaderStore } from "./_loader"

export const useExternalPatients = createLoaderStore(getExternalPatients)
