export const fileMapping = {
    loader: 'Dots_Loader.json',
    loading: 'Logo.json',
}

export const loadAsset = async (fileName: string) => {
    const config = fetch(`/assets/json/${fileName}`)
        .then(res => {
            return res.json()
        })
        .catch(err => {
            console.error(err, 'Load asset Error')
        })
    return config
}
