"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'

const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "5+ years",
    description: "Join our engineering team to build the future of travel technology",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3+ years",
    description: "Create beautiful and intuitive experiences for our users",
  },
  {
    id: 3,
    title: "Customer Success Manager",
    department: "Operations",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "4+ years",
    description: "Help our customers have the best possible experience with our platform",
  },
  {
    id: 4,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "5+ years",
    description: "Lead our marketing initiatives and grow our brand presence",
  },
]

export function JobListings() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = jobListings.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
        <p className="text-muted-foreground text-lg">
          Join our team and help shape the future of luxury stays
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                  <CardDescription>{job.department}</CardDescription>
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span className="font-medium">Location:</span> {job.location}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {job.experience}
                  </div>
                </div>
                <p className="text-muted-foreground">{job.description}</p>
                <Button asChild>
                  <Link href={`/careers/${job.id}`}>View Position</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

