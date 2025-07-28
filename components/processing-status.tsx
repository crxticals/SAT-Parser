"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Loader2, AlertCircle } from "lucide-react"
import type { ProcessedFile } from "@/app/page"

interface ProcessingStatusProps {
  files: ProcessedFile[]
}

export function ProcessingStatus({ files }: ProcessingStatusProps) {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No files currently processing</p>
      </div>
    )
  }

  const getStatusIcon = (status: ProcessedFile["status"]) => {
    switch (status) {
      case "uploading":
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      case "processing":
        return <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: ProcessedFile["status"]) => {
    switch (status) {
      case "uploading":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Uploading
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Processing
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusText = (file: ProcessedFile) => {
    switch (file.status) {
      case "uploading":
        return "Uploading file..."
      case "processing":
        return "Parsing document and extracting data..."
      case "error":
        return file.error || "An error occurred"
      default:
        return "Processing..."
    }
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <Card key={file.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(file.status)}
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-gray-500">Uploaded {file.uploadedAt.toLocaleTimeString()}</p>
                </div>
              </div>
              {getStatusBadge(file.status)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{getStatusText(file)}</span>
                <span>{Math.round(file.progress)}%</span>
              </div>
              <Progress value={file.progress} className="w-full" />
            </div>

            {file.status === "processing" && (
              <div className="mt-4 text-xs text-gray-500">
                <p>• Extracting student information</p>
                <p>• Processing test scores</p>
                <p>• Validating data format</p>
                <p>• Generating CSV structure</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
