import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Button } from "/components/ui/button"

// Sample data for Backrooms levels
const backroomsLevels = [
  {
    id: 1,
    name: "Level 1",
    description: "The first level of the Backrooms, known for its endless corridors and eerie silence.",
    details: "Level 1 is a vast, monotonous space filled with identical corridors that seem to stretch infinitely. The walls are made of white tiles, and the lighting is dim and constant. The air is cold and still, and the only sound is the distant hum of machinery."
  },
  {
    id: 2,
    name: "Level 2",
    description: "A more chaotic level with various anomalies and dangerous entities.",
    details: "Level 2 is a chaotic and unpredictable environment filled with anomalies and dangerous entities. The corridors are twisted and disorienting, and the lighting flickers erratically. The air is thick with an unsettling energy, and strange noises echo through the halls."
  },
  {
    id: 3,
    name: "Level 3",
    description: "A level filled with water and various underwater anomalies.",
    details: "Level 3 is a flooded environment filled with water and various underwater anomalies. The corridors are submerged, and the water is murky and dark. The air is humid and heavy, and the sound of dripping water is constant. The walls are covered in algae and other aquatic life."
  }
]

export default function BackroomsTerminal() {
  const [selectedLevel, setSelectedLevel] = useState(null)

  return (
    <div className="bg-black text-green-400 min-h-screen font-mono p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Backrooms Terminal</h1>
      </header>
      <main>
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backroomsLevels.map((level) => (
              <Card key={level.id} className="bg-black text-green-400 border-green-400">
                <CardHeader>
                  <CardTitle>{level.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{level.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" onClick={() => setSelectedLevel(level)}>View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        {selectedLevel && (
          <div className="bg-black text-green-400 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">{selectedLevel.name}</h2>
            <p className="text-sm mb-4">{selectedLevel.details}</p>
            <Button variant="outline" onClick={() => setSelectedLevel(null)}>Back to Levels</Button>
          </div>
        )}
      </main>
    </div>
  )
}
Share
Refresh
