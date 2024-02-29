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
      <DialogTrigger className="bg-[--bg-adfectus] hover:bg-cyan-600 !text-slate-50 rounded-md px-4 py-2">
        Se fordeling
      </DialogTrigger>
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
