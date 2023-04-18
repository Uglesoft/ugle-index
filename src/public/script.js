const ugle_index = {

    indexInit: (filterId, parentId, pageSize, addressId) => {

        window.filterEl = document.querySelector(filterId);
        window.parentEl = document.querySelector(parentId);

        window.pageSize = pageSize;

        window.addressEl = document.querySelector(addressId);

        addressEl.innerHTML = 'Showing 0 - 0 of 0';

    },

    returnFilteredChildren: (completeArray) => {
        return new Promise((resolve) => {
            const filteredChildren = [];

            const checkChild = (child) => {
                let hasMatch = false;
                if (child.childNodes) {
                    for (let i = 0; i < child.childNodes.length; i++) {
                        if (checkChild(child.childNodes[i])) {
                            hasMatch = true;
                        }
                    }
                }
                if (child.classList && child.classList.contains("ugle-index-filter")) {
                    if (child.innerHTML.toUpperCase().includes(filterEl.value.toUpperCase())) {
                        hasMatch = true;
                    }
                }
                if (hasMatch) {
                    return true;
                } else {
                    return false;
                }
            };

            completeArray.forEach((child) => {
                try {
                    if (checkChild(child)) {
                        child.style.display = "block";
                    } else {
                        child.style.display = "none";
                    }
                } catch (err) {
                    console.error(err);
                }
            });

            resolve(filteredChildren);
        });
    },

    resetFilter: async () => {

        filterEl.value = '';

        paginationBegin();

    },

    paginationBegin: async () => {

        let beginAddress = 1; // added let keyword
        let endAddress = pageSize; // added let keyword

        const filteredChildren = await ugle_index.returnFilteredChildren(Array.from(parentEl.children)); // added const keyword

        filteredChildren.forEach((item, index) => {
            if (index > endAddress - 1) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });

        if (filteredChildren.length == 0) {
            beginAddress = 0;
        }

        if (filteredChildren.length < endAddress) {
            endAddress = filteredChildren.length;
        }

        addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`;

    },

    paginationEnd: async () => {

        let beginAddress; // added let keyword
        let endAddress = filteredChildren.length; // added let keyword

        const filteredChildren = await ugle_index.returnFilteredChildren(Array.from(parentEl.children)); // added const keyword

        filteredChildren.forEach((item, index) => {
            if (index >= (filteredChildren.length - pageSize)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        if (filteredChildren.length == 0) {
            beginAddress = 0;
        }

        if (beginAddress) {
            beginAddress = 1;
        }

        if (filteredChildren.length < endAddress) {
            endAddress = filteredChildren.length;
        }

        addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`;

    },

    paginationNext: async () => {

        let beginAddress = 0; // added let keyword
        let endAddress = 0; // added let keyword
        let found = false;
        let counter = 0;

        const filteredChildren = await ugle_index.returnFilteredChildren(Array.from(parentEl.children)); // added const keyword

        filteredChildren.forEach((item, index) => {
            if (item.style.display == 'block') {
                found = true;
                item.style.display = 'none';
            } else if (found && counter < pageSize) {
                if (counter == 0) {
                    beginAddress = index;
                }
                counter++;
                item.style.display = 'block';
            }
        });

        if (counter < pageSize) {
            paginationEnd();
        } else {

            beginAddress += 1;

            if (filteredChildren.length == 0) {
                beginAddress = 0;
            }

            endAddress = beginAddress + pageSize - 1;

            if (filteredChildren.length < endAddress) {
                endAddress = filteredChildren.length;
            }

            addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`;
        }

    },

    paginationPrev: async () => {

        let beginAddress = 0; // added let keyword
        let endAddress = 0; // added let keyword
        let found = false;
        let counter = 0;

        const filteredChildren = await ugle_index.returnFilteredChildren(Array.from(parentEl.children)); // added const keyword

        const reversedFilteredChildren = [...filteredChildren].reverse(); // create a copy of the array and reverse it

        reversedFilteredChildren.forEach((item, index) => { // use the reversed array
            if (item.style.display == 'block') {
                found = true;
                item.style.display = 'none';
            } else if (found && counter < pageSize) {
                if (counter == 0) {
                    endAddress = filteredChildren.length - index;
                }
                counter++;
                item.style.display = 'block';
            }
        });

        if (counter < pageSize) {
            paginationBegin();
        } else {

            beginAddress = endAddress - pageSize + 1;

            if (beginAddress < 1) {
                beginAddress = 1;
            }

            if (filteredChildren.length < endAddress) {
                endAddress = filteredChildren.length;
            }

            addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`;

        }

    },

};