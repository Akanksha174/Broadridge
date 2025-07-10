"use client"

import { useState } from "react"
import { Download, Eye } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const awsTasks = [
  {
    id: "ec2",
    title: "Amazon EC2 Task",
    description: "Launch and configure an EC2 instance with security groups and key pairs",
    service: "EC2",
    difficulty: "Beginner",
  },
  // ... (rest of the awsTasks unchanged for brevity)
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    case "Intermediate":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "Advanced":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

export default function AWSTaskDashboard() {
  const [selectedTask, setSelectedTask] = useState<(typeof awsTasks)[0] | null>(null)

  const handleDownload = (taskId: string, screenshotIndex?: number) => {
    console.log(`Downloading resources for ${taskId} screenshot ${screenshotIndex ?? ''}`)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold font-mono text-green-400 text-center mb-4">AWS Task Dashboard</h1>
          <div className="text-center font-mono text-lg text-gray-300">
            <p className="mb-1">Name: <span className="text-blue-400 font-semibold">Akanksha Aahna</span></p>
            <p>Registration Number: <span className="text-purple-400 font-semibold">12203778</span></p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 space-y-12">
        {awsTasks.map((task, index) => (
          <div key={task.id} className="space-y-6">
            <h2 className="text-3xl font-bold font-mono text-gray-100">Task {index + 1}: {task.title}</h2>
            <p className="text-gray-400 font-mono text-md">{task.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((screenshotIdx) => (
                <Card key={screenshotIdx} className="bg-gray-900/50 border border-gray-700 hover:border-blue-500">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={`font-mono text-xs ${getDifficultyColor(task.difficulty)}`}>
                        {task.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="font-mono text-xs bg-gray-800 text-gray-300">
                        {task.service}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-mono text-gray-100">Screenshot {screenshotIdx}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                      <Image
                        src={`/placeholder.svg?height=200&width=300&text=${task.service}+Screenshot+${screenshotIdx}`}
                        alt={`${task.title} Screenshot ${screenshotIdx}`}
                        fill
                        className="object-cover opacity-80 hover:opacity-100"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 font-mono border-gray-600 hover:border-blue-500 hover:text-blue-400"
                            onClick={() => setSelectedTask(task)}
                          >
                            <Eye className="w-4 h-4 mr-2" /> Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-gray-900 border-gray-700 max-w-4xl">
                          <DialogHeader>
                            <DialogTitle className="font-mono text-green-400">
                              {selectedTask?.title} - Screenshot {screenshotIdx}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=600&width=800&text=${selectedTask?.service}+Screenshot+${screenshotIdx}`}
                              alt={`${selectedTask?.title} Screenshot ${screenshotIdx}`}
                              width={800}
                              height={600}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        className="flex-1 font-mono bg-green-600 hover:bg-green-700"
                        onClick={() => handleDownload(task.id, screenshotIdx)}
                      >
                        <Download className="w-4 h-4 mr-2" /> Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-500 font-mono text-sm">
              AWS Developer Task Dashboard © 2025 | Cloud Practitioner Essentials
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}