"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import { ProcessingStatus } from "@/components/processing-status"
import { CsvPreview } from "@/components/csv-preview"
import { DatabaseSchema } from "@/components/database-schema"
import { FileText, Database, Download, Upload } from "lucide-react"

export interface ProcessedFile {
  id: string
  name: string
  status: "uploading" | "processing" | "completed" | "error"
  progress: number
  csvData?: string[][]
  error?: string
  uploadedAt: Date
}

export default function Home() {
  const [files, setFiles] = useState<ProcessedFile[]>([])
  const [activeTab, setActiveTab] = useState("upload")

  const handleFilesAdded = (newFiles: File[]) => {
    const processedFiles: ProcessedFile[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      status: "uploading",
      progress: 0,
      uploadedAt: new Date(),
    }))

    setFiles((prev) => [...prev, ...processedFiles])

    // Simulate file processing (replace with actual backend calls)
    processedFiles.forEach((file) => {
      simulateProcessing(file.id)
    })
  }

  const simulateProcessing = (fileId: string) => {
    // Simulate upload progress
    let progress = 0
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        progress = 100
        clearInterval(uploadInterval)

        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, status: "processing", progress: 0 } : f)))

        // Simulate processing
        const processInterval = setInterval(() => {
          progress += Math.random() * 15
          if (progress >= 100) {
            progress = 100
            clearInterval(processInterval)

            // Simulate successful completion with sample CSV data
            const sampleCsvData = [
              ["Student ID", "Name", "Test Date", "Math Score", "Reading Score", "Writing Score", "Total Score"],
              ["12345", "John Doe", "2024-01-15", "650", "680", "640", "1970"],
              ["12346", "Jane Smith", "2024-01-15", "720", "700", "690", "2110"],
              ["12347", "Bob Johnson", "2024-01-15", "580", "620", "600", "1800"],
            ]

            setFiles((prev) =>
              prev.map((f) =>
                f.id === fileId ? { ...f, status: "completed", progress: 100, csvData: sampleCsvData } : f,
              ),
            )
          } else {
            setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
          }
        }, 500)
      } else {
        setFiles((prev) => prev.map((f) => (f.id === fileId ? { ...f, progress } : f)))
      }
    }, 300)
  }

  const completedFiles = files.filter((f) => f.status === "completed")
  const processingFiles = files.filter((f) => f.status !== "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SAT Document Parser</h1>
          <p className="text-lg text-gray-600">Convert SAT test documents into structured CSV files</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="processing" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Processing ({processingFiles.length})
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Results ({completedFiles.length})
            </TabsTrigger>
            <TabsTrigger value="schema" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Schema
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload SAT Documents</CardTitle>
                <CardDescription>
                  Drag and drop your SAT test documents or click to browse. Supported formats: PDF, DOC, DOCX, TXT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onFilesAdded={handleFilesAdded} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Status</CardTitle>
                <CardDescription>Track the progress of your document processing</CardDescription>
              </CardHeader>
              <CardContent>
                <ProcessingStatus files={processingFiles} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Processed Results</CardTitle>
                <CardDescription>View and download your converted CSV files</CardDescription>
              </CardHeader>
              <CardContent>
                <CsvPreview files={completedFiles} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Schema</CardTitle>
                <CardDescription>View the expected structure for the CSV output</CardDescription>
              </CardHeader>
              <CardContent>
                <DatabaseSchema />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
