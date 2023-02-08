const Step1 = ({ postData, setPostData }) => {
    const setImages = () => {

    }
    return (
        <>
            <form>
                <input type="file" accept="image/png, image/jpeg" multiple onChange={setImages} />
            </form>
        </>
    )
}
export default Step1