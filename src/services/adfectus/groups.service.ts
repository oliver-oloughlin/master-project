import { AdfectusGroup } from "#/models/adfectus/group"
import { mockAdfectusGroups } from "#/models/adfectus/mocks/groups"
import { sleep } from "#/utils/sleep"

export async function getAdfectusGroups(): Promise<AdfectusGroup[]> {
  await sleep(350)
  return mockAdfectusGroups
}

export async function getAdfectusGroupById(
  id: string,
): Promise<AdfectusGroup | null> {
  await sleep(350)
  return mockAdfectusGroups.find((g) => g.groupId === id) ?? null
}
