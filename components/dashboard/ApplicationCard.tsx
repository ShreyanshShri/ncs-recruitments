import { Application, Domain } from "@/types/db";
import { applyToDomain } from "@/app/actions/dashboard";

type Props =
	| {
			type: "applied";
			application: Application;
	  }
	| {
			type: "available";
			domain: Domain;
	  };

export function ApplicationCard(props: Props) {
	if (props.type === "applied") {
		const { application } = props;

		return (
			<div className="p-4 rounded-xl space-y-2">
				<h3 className="font-shuriken font-medium ">{application.domain}</h3>
				{/* <p className="text-sm">Status: {application.status}</p> */}
				<p className="text-sm">Status: SUBMITTED</p>

				{/* <button className="border px-3 py-1 rounded">View Application</button> */}
			</div>
		);
	}

	return (
		<div className="p-4 rounded-xl space-y-2">
			<h3 className="font-shuriken font-medium ">{props.domain}</h3>

			<form action={applyToDomain.bind(null, props.domain)}>
				<button className="border border-primary-red px-3 py-1 rounded font-shuriken font-medium text-[12px] hover:cursor-pointer">
					Apply
				</button>
			</form>
		</div>
	);
}
