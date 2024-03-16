import { mockAdfectusGroups } from "#/models/adfectus/mocks/groups"
import { ViewGroup } from "#/models/view/group"
import { sleep } from "#/utils/sleep"
import { getPatientsByGroupId } from "./patients"

export async function getGroupIds(): Promise<string[]> {
  await sleep(350)
  return mockAdfectusGroups.map((g) => g.groupId)
}

export async function getGroupById(id: string): Promise<ViewGroup | null> {
  const group = mockAdfectusGroups.find((g) => g.groupId === id)

  if (!group) {
    return null
  }

  const patients = await getPatientsByGroupId(id)

  return {
    ...group,
    patients,
  }
}
