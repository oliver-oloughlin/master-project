import { mockGroups } from "#/models/mocks/groups"
import { mockPatients } from "#/models/mocks/patients"
import { sleep } from "#/utils/sleep"

export async function getGroups() {
  await sleep(350)
  return mockGroups
}

export async function getGroup(groupId: string) {
  await sleep(350)
  
  const group = mockGroups.find(g => g.groupId === groupId)
  if (!group) {
    return null
  }

  const patients = mockPatients.filter(p => p.groupId === groupId)
  return {
    ...group,
    patients,
  }
}
