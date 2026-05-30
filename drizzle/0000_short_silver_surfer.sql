CREATE TABLE `MessageArray` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text
);
--> statement-breakpoint
CREATE TABLE `Message` (
	`id` text PRIMARY KEY NOT NULL,
	`message` text,
	`isUserPrompt` boolean,
	`mood` text,
	`messageArrayId` text NOT NULL,
	FOREIGN KEY (`messageArrayId`) REFERENCES `MessageArray`(`id`) ON UPDATE no action ON DELETE no action
);
