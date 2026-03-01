import { Trainingszeit } from "@/lib/types";

interface ClubTrainingProps {
  trainingszeiten: Trainingszeit[];
}

export default function ClubTraining({ trainingszeiten }: ClubTrainingProps) {
  if (trainingszeiten.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="font-headline text-xl text-off-black dark:text-white mb-4">
        Trainingszeiten
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                Mannschaft
              </th>
              <th className="text-left py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                Tag
              </th>
              <th className="text-left py-2 pr-4 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                Zeit
              </th>
              <th className="text-left py-2 font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">
                Ort
              </th>
            </tr>
          </thead>
          <tbody>
            {trainingszeiten.map((training, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700/50 last:border-b-0"
              >
                <td className="py-3 pr-4 font-medium text-off-black dark:text-white">
                  {training.mannschaft}
                </td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">
                  {training.tag}
                </td>
                <td className="py-3 pr-4 text-gray-600 dark:text-gray-400 tabular-nums">
                  {training.zeit}
                </td>
                <td className="py-3 text-gray-500 dark:text-gray-400">
                  {training.ort || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
