"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database, Key, Type, FileText } from "lucide-react"

export function DatabaseSchema() {
  const schema = [
    {
      column: "question_id",
      type: "VARCHAR(50)",
      required: true,
      description: "Unique identifier for the question (e.g., QUESTION98)",
    },
    {
      column: "question_type",
      type: "VARCHAR(30)",
      required: true,
      description: "Type of question (e.g., multiple_choice, Multi_choice)",
    },
    {
      column: "question_text",
      type: "TEXT",
      required: true,
      description: "The main question text content",
    },
    {
      column: "instructions",
      type: "TEXT",
      required: false,
      description: "Additional instructions, diagrams, or context for the question",
    },
    {
      column: "answer_choices",
      type: "JSON",
      required: true,
      description: "Array of answer choices in JSON format",
    },
    {
      column: "correct_answer",
      type: "VARCHAR(10)",
      required: true,
      description: "Index or identifier of the correct answer (e.g., '1', '2', 'A', 'B')",
    },
    {
      column: "explanation",
      type: "TEXT",
      required: false,
      description: "Detailed solution and explanation for the question",
    },
    {
      column: "difficulty",
      type: "VARCHAR(20)",
      required: false,
      description: "Difficulty level (Easy, Medium, Hard, intense)",
    },
    {
      column: "tag",
      type: "VARCHAR(50)",
      required: false,
      description: "Subject tag or category (e.g., Vocab, Angle, Algebra)",
    },
    {
      column: "reference_id",
      type: "VARCHAR(30)",
      required: false,
      description: "Reference identifier (e.g., JunD24.1.3, DecA23.4.22)",
    },
    {
      column: "marks",
      type: "INTEGER",
      required: false,
      description: "Points awarded for correct answer",
    },
    {
      column: "negative_marks",
      type: "INTEGER",
      required: false,
      description: "Points deducted for incorrect answer",
    },
    {
      column: "answer_time",
      type: "INTEGER",
      required: false,
      description: "Recommended time to answer in minutes",
    },
    {
      column: "created_at",
      type: "TIMESTAMP",
      required: false,
      description: "When the question was imported",
    },
    {
      column: "source_file",
      type: "VARCHAR(255)",
      required: false,
      description: "Original document filename",
    },
  ]

  const sampleData = [
    {
      question_id: "QUESTION98",
      question_type: "multiple_choice",
      question_text: "Which choice completes the text with the most logical and precise word or phrase?",
      instructions:
        "The Ghana Stock Exchange helps to _____ concerns for potential investors by handling regulatory details.",
      answer_choices: '["assuage", "convey", "amplify", "designate"]',
      correct_answer: "1",
      explanation:
        "The sentence is about the Ghana Stock Exchange helping to alleviate concerns for potential investors by handling regulatory details. 'Assuage' means to make an unpleasant feeling less intense, which fits the context of easing investors' worries.",
      difficulty: "Easy",
      tag: "Vocab",
      reference_id: "JunD24.1.3",
      marks: "1",
      negative_marks: "0",
      answer_time: "3",
      created_at: "2024-01-15 10:30:00",
      source_file: "SAT_Practice_Test_June_2024.docx",
    },
    {
      question_id: "QUESTION99",
      question_type: "multiple_choice",
      question_text:
        "In the figure, parallel lines a and b are intersected by lines c, d and e. If z = 67, y = 118, and v < z, which statement about x and w must be true?",
      instructions: "![A diagram of lines and dots](https://example.com/diagram.gif)",
      answer_choices: '["x > w", "x < w", "x = w", "Cannot be determined"]',
      correct_answer: "1",
      explanation:
        "Using properties of parallel lines and transversals, when parallel lines are cut by a transversal, corresponding angles are equal and alternate interior angles are equal.",
      difficulty: "Medium",
      tag: "Geometry",
      reference_id: "DecA23.4.22",
      marks: "1",
      negative_marks: "0",
      answer_time: "4",
      created_at: "2024-01-15 10:31:00",
      source_file: "SAT_Practice_Test_December_2023.docx",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            SAT Questions Database Schema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Column Name</TableHead>
                  <TableHead>Data Type</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schema.map((field, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">
                      <div className="flex items-center gap-2">
                        {field.column === "question_id" && <Key className="w-3 h-3 text-yellow-600" />}
                        {field.column}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-xs">
                        <Type className="w-3 h-3 mr-1" />
                        {field.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={field.required ? "default" : "secondary"}>
                        {field.required ? "Required" : "Optional"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{field.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Sample CSV Output
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(sampleData[0]).map((header) => (
                    <TableHead key={header} className="font-mono text-xs">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className="font-mono text-xs">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Document Format Recognition</h4>
              <p className="text-sm text-blue-800">
                The parser will extract questions formatted like:{" "}
                <code className="bg-blue-100 px-1 rounded">Q.3)JunD24.1.3 Which choice completes...</code>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Question numbers and reference IDs are automatically parsed</li>
                <li>• Multiple choice options [1], [2], [3], [4] are extracted as JSON array</li>
                <li>• Metadata like [MARKS], [DIFFICULTY], [TAG] are captured in separate fields</li>
                <li>• Solution explanations are preserved with formatting</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Supported Question Types</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-amber-800">
                <div>• Multiple Choice</div>
                <div>• Fill in the Blank</div>
                <div>• True/False</div>
                <div>• Short Answer</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
