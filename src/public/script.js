const ugle_index = {

    indexInit: (filterId, parentId, pageSize, addressId, targetClass) => {

        window.filterEl = document.querySelector(filterId);
        window.parentEl = document.querySelector(parentId);

        window.pageSize = pageSize;
        window.addressBegin = 0;
        window.addressEnd = 0;

        window.addressEl = document.querySelector(addressId);

        addressEl.innerHTML = 'Showing 0 - 0 of 0';

        window.targetClass = targetClass

        ugle_index.resetFilter()

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
                if (child.classList && child.classList.contains(targetClass)) {
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
                        filteredChildren.push(child)
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

        ugle_index.paginationBegin();

    },

    paginationBegin: async () => {

        ugle_index.goto(0)

    },

    paginationEnd: async () => {

        ugle_index.goto(Array.from(parentEl.children).length)

    },

    paginationNext: async () => {

        ugle_index.goto(addressBegin + pageSize)

    },

    paginationPrev: async () => {

        ugle_index.goto(addressBegin - pageSize)

    },

    goto: async (target) => {

        const filteredChildren = await ugle_index.returnFilteredChildren(Array.from(parentEl.children));

        if (target >= filteredChildren.length) {
            if (filteredChildren.length % pageSize == 0) {
                target = filteredChildren.length - pageSize
            } else {
                target = filteredChildren.length - (filteredChildren.length % pageSize)
            }
        }
        if (target < 0) {
            target = 0
        }

        for (let i = 0; i < filteredChildren.length; i++) {
            if (i < target || i >= target + pageSize) {
                filteredChildren[i].style.display = 'none';
            }
        }

        addressBegin = target
        addressEnd = Math.min(target + pageSize, filteredChildren.length)

        if ((addressBegin + 1) == addressEnd) {
            address = addressEnd
        } else {
            address = `${addressBegin + 1} - ${addressEnd}`
        }
        addressEl.innerHTML = `Showing ${address} of ${filteredChildren.length}`;

    }

};