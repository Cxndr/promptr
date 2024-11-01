import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import dynamic from "next/dynamic";
import { fetchUserProfile } from "@/lib/fetch";
import { redirect } from "next/navigation";
import Image from "next/image";

const ModularForm = dynamic(() => import("@/components/ModularForm"), {
	ssr: false,
});

export default async function ProfilePage() {
	const { userId } = await auth();
	const user = await currentUser();

	//use truthy falsy to determin if profile exists
	async function profileCheck(userId: string | null) {
		"use server";
		try {
			const profile = await fetchUserProfile(userId);
			if (profile.rowCount === 0) {
				return false;
			}
			return true;
		} catch (error) {
			console.error(error);
		}
	}

	async function handleUpdateProfile(formData: FormData) {
		"use server";
		const username = formData.get("username") as string;

		// check whether a profile exists
		try {
			const profile = await fetchUserProfile(userId);
			if (profile.rowCount === 0) {
				// insert into db
				await db.query(
					`INSERT INTO wg_users (clerk_id, username, image_url) VALUES ($1, $2, $3)`,
					[userId, username, user?.imageUrl || null]
				);
			} else {
				// update existing item
				await db.query(
					`UPDATE wg_users SET username = $1, image_url=$2, WHERE clerk_id=$3`,
					[username, user?.imageUrl || null, userId]
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/");
		}
	}

	const profileExists = await profileCheck(userId);
	if (profileExists) redirect("/");

	const fields = [
		{
			name: "username",
			label: "Username",
			type: "username",
			required: true,
			validationMessage: "Enter a unique username",
		},
	];

	return (
		<div
			className={
				"max-w-7xl bg-background/75 py-4 px-8 my-auto mx-4 flex flex-col justify-center items-center rounded-3xl shadow-md shadow-black"
			}
		>
			<SignedIn>
				{user?.imageUrl && (
					<Image
						className={"rounded-full"}
						src={user.imageUrl}
						alt={`${user?.username}'s profile image`}
						height={100}
						width={100}
					/>
				)}
				<h2 className="text-2xl">
					Welcome {user?.firstName} {user?.lastName}
				</h2>
				<p> You are signed in with {user?.emailAddresses[0].emailAddress}</p>
				<p className="text-2xl">Finish your profile setup:</p>
				<ModularForm fields={fields} onSubmit={handleUpdateProfile} />
			</SignedIn>

			<SignedOut>
				<h2 className="text-4xl">Please sign in.</h2>
			</SignedOut>
		</div>
	);
}
