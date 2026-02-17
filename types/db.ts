export enum Role {
	USER = "USER",
	ADMIN = "ADMIN",
}

export enum Domain {
	PROGRAMMING = "PROGRAMMING",
	DEV = "DEV",
	DESIGN = "DESIGN",
	TECHNICAL = "TECHNICAL",
}

export enum ApplicationStatus {
	DRAFT = "DRAFT",
	SUBMITTED = "SUBMITTED",
	UNDER_REVIEW = "UNDER_REVIEW",
	SHORTLISTED = "SHORTLISTED",
	REJECTED = "REJECTED",
	SELECTED = "SELECTED",
}

export enum RoundType {
	MCQ = "MCQ",
	OFFLINE = "OFFLINE",
}

export enum SubmissionStatus {
	NOT_STARTED = "NOT_STARTED",
	STARTED = "STARTED",
	SUBMITTED = "SUBMITTED",
	EVALUATED = "EVALUATED",
}

export enum QuestionType {
	MCQ = "MCQ",
	INPUT = "INPUT",
}

// Interfaces
export interface User {
	id: string;
	name: string | null;
	email: string;
	role: Role;
	createdAt: Date | string; // string for serialization safety
}

export interface Application {
	id: string;
	userId: string;
	domain: Domain;
	status: ApplicationStatus;
	createdAt: Date | string;
}

export interface Round {
	id: string;
	domain: Domain;
	type: RoundType;
	order: number;
	title: string;
	isActive: boolean;
	isPublished: boolean;
	publishedAt: Date;
	startTime: Date | string | null;
	endTime: Date | string | null;
	cutoff: number | null;
	maxScore: number | null;
	markingScheme: any;
	createdAt: Date | string;
}

export interface Question {
	id: string;
	roundId: string;
	question: string;
	type: QuestionType;
	options: any;
	answer: string;
	marks: number;
}

export interface Submission {
	id: string;
	applicationId: string;
	roundId: string;
	status: SubmissionStatus;
	score: number | null;
	responses: any;
	evaluatedBy: string | null;
	createdAt: Date | string;
}
