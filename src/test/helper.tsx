const dictionary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const getRandomText = (max: number) => {
	return Array(max)
		.join()
		.split(",")
		.map(() => {
			return dictionary.charAt(Math.floor(Math.random() * dictionary.length));
		})
		.join("");
};
