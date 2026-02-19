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
	RESUME = "RESUME",
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

export enum RoundScope {
	COMMON = "COMMON",
	DOMAIN = "DOMAIN",
}

export enum Year {
	FIRST = "FIRST",
	SECOND = "SECOND",
	THIRD = "THIRD",
	FOURTH = "FOURTH",
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
	title: string;
	order: number;
	type: RoundType;
	scope: "COMMON" | "DOMAIN";
	domain: Domain | null;
	isActive: boolean;
	isPublished: boolean;
	startTime: Date | string | null;
	endTime: Date | string | null;
	cutoff: number | null;
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
	roundId: string;
	userId: string | null;
	applicationId: string | null;
	status: SubmissionStatus;
	score: number | null;
	responses: any;
	evaluatedBy: string | null;
	createdAt: Date | string;
}
