import { ADFECTUS_BTN_CLASS } from "../misc/AdfectusButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import GroupDistributionChart from "./GroupDistributionChart"

export default function GroupActivityScoreDistributionDialog({
  scoresCountMap,
  activity,
}: {
  scoresCountMap: Map<number, number>
  activity: string
}) {
  return (
    <Dialog>
      <DialogTrigger className={ADFECTUS_BTN_CLASS}>Se fordeling</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fordeling - {activity}</DialogTitle>
          <DialogDescription>
            Antall pasienter som har svart for hver kategori
          </DialogDescription>
        </DialogHeader>
        <GroupDistributionChart scoresCountMap={scoresCountMap} />
      </DialogContent>
    </Dialog>
  )
}
