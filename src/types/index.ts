import { Document } from "mongoose"

export interface StudentDocument extends Document {
    phone: number,
    name: string,
    studentId: string,
    courseId: string,
    batchId: string,
    totalFee: number,
    joiningDate: Date,
    createdAt: Date,
    setStudentId: () => void,
}

export interface ExamDocument extends Document {
    name: string,
    examId: string,
    courseId: string,
    batchId: string,
    examDate: Date,
    createdAt: Date,
    setExamId: () => void,
}

export interface QuestionDocument extends Document {
    examId: string,
    questionId: string,
    question: string,
    options: (string|number|boolean)[],
    answer: string|number|boolean,
    setQuestionId:() => void,
}

export interface CourseDocument extends Document {
    name: string,
    courseId: string,
    description: string,
    createdAt: Date,
    setCourseId: () => void,
}

export interface BatchDocument extends Document {
    name: string,
    batchId: string,
    courseId: string,
    description: string,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    setBatchId: () => void,
}

export interface AdminDocument extends Document {
    adminId: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    setAdminId: () => void,
    setPassword: (password: string) => void,
    verifyPassword: (password: string) => boolean,
}

export interface AdminDocument extends Document {
    adminId: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    setAdminId: () => void,
    setPassword: (password: string) => void,
    verifyPassword: (password: string) => boolean,
}

export interface ResultDocument extends Document {
    resultId: string,
    studentId: string,
    examId: string,
    answers: Record<string, any> // eg: { questionId: answer }
    correctAnswers: number,
    incorrectAnswers: number,
    submittedAt: Date,
    setResultId: () => void,
}

export type DataType = "string" | "number" | "boolean" | "array" | "object" | "date" | "any"

export type DocumentType = StudentDocument | ExamDocument | CourseDocument | BatchDocument | QuestionDocument | AdminDocument | ResultDocument

export type RequestValidation = {
    [key: string] : {
        type: DataType;
        required: boolean;
        unique?: boolean;
    };
}

export type ParsedQs = string | string[] | undefined;

