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
            filteredChildren = []

            completeArray.forEach((child, index) => {
                try {

                    tag_stripped = child.innerHTML.toUpperCase().replace(new RegExp(`<[^${tagName}]`, 'ig'), '').replace(new RegExp(`${tagName}[^>]+>`, 'ig'), '')
                    raw_substring = tag_stripped.substring(0, tag_stripped.indexOf('<'))

                    let tag_stripped = child.innerHTML.toUpperCase().replace(new RegExp(`<[^${tagName}]`, 'ig'), '').replace(new RegExp(`${tagName}[^>]+>`, 'ig'), '');
                    let raw_substring = tag_stripped.substring(0, tag_stripped.indexOf('<'));

                    if (raw_substring.includes(filterEl.value.toUpperCase())) {
                        // (/<([^>]+)>)/ig, '')
                        filteredChildren.push(child)
                    } else {
                        child.style.display = 'none'
                    }

                    if (index == completeArray.length - 1) {

                        resolve(filteredChildren)

                    }
                } catch (err) {
                    console.error(err)
                }
            })
        })
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
