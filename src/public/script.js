ugle_index = {

    indexInit: (filterId, parentId, pageSize, addressId) => {

        filterEl = document.querySelector(filterId)
        parentEl = document.querySelector(parentId)

        window.pageSize = pageSize

        window.addressEl = document.querySelector(addressId)

        addressEl.innerHTML = 'Showing 0 of 0'

    },

    returnFilteredChildren: (completeArray) => {
        return new Promise((resolve) => {
            const filteredChildren = [];

            const checkChild = (child) => {
                if (child.classList && child.classList.contains("ugle-index-filter")) {
                    if (child.innerHTML.toUpperCase().includes(filterEl.value.toUpperCase())) {
                        child.style.display = "none";
                        return true;
                    }
                }

                if (child.childNodes) {
                    for (let i = 0; i < child.childNodes.length; i++) {
                        const isHidden = checkChild(child.childNodes[i]);
                        if (isHidden) {
                            return true;
                        }
                    }
                }

                return false;
            };

            completeArray.forEach((child) => {
                try {
                    checkChild(child);
                } catch (err) {
                    console.error(err);
                }
            });

            resolve(filteredChildren);
        });
    },

    resetFilter: async () => {

        filterEl.value = '';

        paginationBegin()

    },

    paginationBegin: async () => {

        beginAddress = 1
        endAddress = pageSize

        filterChildren = await returnFilteredChildren(Array.from(parentEl.children))

        filteredChildren.forEach((item, index) => {
            if (index > endAddress - 1) {
                item.style.display = 'none'
            } else {
                item.style.display = 'block'
            }
        })

        if (filteredChildren.length == 0) {
            beginAddress = 0
        }

        if (filteredChildren.length < endAddress) {
            endAddress = filteredChildren.length
        }

        addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`

    },

    paginationEnd: async () => {

        endAddress = filteredChildren.length
        beginAddress = filteredChildren.length - pageSize + 1

        filterChildren = await returnFilteredChildren(Array.from(parentEl.children))

        filteredChildren.forEach((item, index) => {
            if (index >= (filteredChildren.length - pageSize)) {
                item.style.display = 'block'
            } else {
                item.style.display = 'none'
            }
        })

        if (filteredChildren.length == 0) {
            beginAddress = 0
        }

        if (beginAddress) {
            beginAddress = 1
        }

        if (filteredChildren.length < endAddress) {
            endAddress = filteredChildren.length
        }

        addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`

    },

    paginationNext: async () => {

        beginAddress = 0
        endAddress = 0

        found = false
        counter = 0

        filterChildren = await returnFilteredChildren(Array.from(parentEl.children))

        filteredChildren.forEach((item, index) => {
            if (item.style.display == 'block') {
                found = true
                item.style.display = 'none'
            } else if (found && counter < pageSize) {
                if (counter == 0) {
                    beginAddress = index
                }
                counter++
                item.style.display = 'block'
            }
        })

        if (counter < pageSize) {
            paginationEnd()
        } else {

            beginAddress += 1

            if (filteredChildren.length == 0) {
                beginAddress = 0
            }

            endAddress = beginAddress + pageSize - 1

            if (filteredChildren.length < endAddress) {
                endAddress = filteredChildren.length
            }

            addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`
        }

    },

    paginationPrev: async () => {

        beginAddress = 0
        endAddress = 0

        found = false
        counter = 0

        filterChildren = await returnFilteredChildren(Array.from(parentEl.children))

        filteredChildren.reverse().forEach((item, index) => {
            if (item.style.display == 'block') {
                found = true
                item.style.display = 'none'
            } else if (found && counter < pageSize) {
                if (counter == 0) {
                    endAddress = filteredChildren.length - index
                }
                counter++
                item.style.display = 'block'
            }
        })

        if (counter < pageSize) {
            paginationBegin()
        } else {

            beginAddress = endAddress - pageSize + 1

            if (beginAddress < 1) {
                beginAddress = 1
            }

            if (filteredChildren.length < endAddress) {
                endAddress = filteredChildren.length
            }

            addressEl.innerHTML = `Showing ${beginAddress} - ${endAddress} of ${filteredChildren.length}`

        }

    },

}
