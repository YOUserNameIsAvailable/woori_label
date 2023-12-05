import { useCallback, useState } from "react";

export const useOpen = (init) => {
	const [isOpen, setIsOpen] = useState(init || false);
	const onOpen = useCallback(() => {
		setIsOpen(true);
	}, []);
	const onClose = useCallback(() => {
		setIsOpen(false);
	}, []);
	const onToggle = useCallback(() => {
		setIsOpen((prev) => {
			return !prev;
		});
	}, []);

	return {
		isOpen,
		setIsOpen,
		onOpen,
		onClose,
		onToggle,
	};
};
