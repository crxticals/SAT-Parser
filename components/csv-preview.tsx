"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileText, Calendar } from "lucide-react"
import type { ProcessedFile } from "@/app/page"

interface CsvPreviewProps {
  files: ProcessedFile[]
}

export function CsvPreview({ files }: CsvPreviewProps) {
  const [selectedFile, setSelectedFile] = useState<ProcessedFile | null>(null)

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No processed files available</p>
        <p className="text-sm text-gray-400 mt-2">Upload and process documents to see results here</p>
      </div>
    )
  }

  const downloadCsv = (file: ProcessedFile) => {
    if (!file.csvData) return

    const csvContent = file.csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${file.name.replace(/\.[^/.]+$/, "")}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const downloadAllCsv = () => {
    files.forEach((file) => {
      if (file.csvData) {
        setTimeout(() => downloadCsv(file), 100)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Processed Files</h3>
          <p className="text-sm text-gray-500">
            {files.length} file{files.length !== 1 ? "s" : ""} ready for download
          </p>
        </div>
        <Button onClick={downloadAllCsv} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download All CSV
        </Button>
      </div>

      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <CardTitle className="text-base">{file.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Processed {file.uploadedAt.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {file.csvData ? file.csvData.length - 1 : 0} records
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFile(selectedFile?.id === file.id ? null : file)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {selectedFile?.id === file.id ? "Hide" : "Preview"}
                  </Button>
                  <Button size="sm" onClick={() => downloadCsv(file)}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>

            {selectedFile?.id === file.id && file.csvData && (
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="max-h-96 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {file.csvData[0]?.map((header, index) => (
                            <TableHead key={index} className="font-medium">
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {file.csvData.slice(1, 11).map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <TableCell key={cellIndex} className="text-sm">
                                {cell}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  {file.csvData.length > 11 && (
                    <div className="p-3 bg-gray-50 text-center text-sm text-gray-500">
                      Showing first 10 rows of {file.csvData.length - 1} total records
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
