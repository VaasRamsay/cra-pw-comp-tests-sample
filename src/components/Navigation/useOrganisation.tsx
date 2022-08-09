import { OrganisationAPI, OrganisationAutocompleteInterface } from "api/OrganisationAPI";
import { useState, useEffect } from "react";

const useOrganisation = (): [OrganisationAutocompleteInterface[], boolean, boolean] => {
	const [mounted, setMounted] = useState(false);
	const [organisationData, setOrganisationData] = useState<OrganisationAutocompleteInterface[]>(
		[],
	);
	const [organisationDataIsLoading, setOrganisationDataIsLoading] = useState(false);
	const [organisationDataError, setOrganisationDataError] = useState(false);

	useEffect(() => {
		const fetchOrganisations = async () => {
			let output: OrganisationAutocompleteInterface[] =
				[] as OrganisationAutocompleteInterface[];

			try {
				if (mounted) {
					setOrganisationDataError(false);
					setOrganisationDataIsLoading(true);
					output = await new OrganisationAPI().getResult();
				}
			} catch (error) {
				setOrganisationDataError(true);
			} finally {
				setOrganisationDataIsLoading(false);
			}

			return output ?? ([] as OrganisationAutocompleteInterface[]);
		};

		setMounted(true);
		fetchOrganisations().then((apiData) => {
			setOrganisationData(apiData);
		});
		return () => {
			setMounted(false);
		};
	}, [mounted]);

	return [organisationData, organisationDataIsLoading, organisationDataError];
};

export default useOrganisation;
