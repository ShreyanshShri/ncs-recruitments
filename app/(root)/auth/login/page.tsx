import { login } from "@/app/actions/auth";

export default function Login() {
	return (
		<form action={login} className="space-y-4">
			<input name="email" type="email" required />
			<input name="password" type="password" required />
			<button type="submit">Login</button>
		</form>
	);
}
