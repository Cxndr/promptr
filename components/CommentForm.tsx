import {
	Form,
	FormControl,
	FormItem,
	FormLabel,
	FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function CommentForm() {
	const form = useForm();
	return (
		<div>
			<Form {...form}>
				<form action="">
					<FormField
						control={form.control}
						name="commentForm"
						render={(field) => (
							<div>
								<FormItem>
									<FormLabel />
									<FormControl>
										<input placeholder="Enter Comment..." {...field} />
									</FormControl>
								</FormItem>
							</div>
						)}
					></FormField>
				</form>
			</Form>
		</div>
	);
}
