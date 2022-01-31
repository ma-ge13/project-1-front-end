export default function ReceiptsList(props: { receipt: string }) {
    console.log("Props receipt: ", props.receipt);

    function dataURLtoBlob(dataurl) {
        let arr = dataurl.split(",");
        console.log("arr: ", arr);
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new Blob([u8arr], { type: mime });
    }

    const blob = dataURLtoBlob(props.receipt);
    // const fileDownloadUrl = URL.createObjectURL(blob);
    
    return (
        <li>
            {/* <a href={fileDownloadUrl} download={true}> Click to download</a> */}
            {console.log("Line 23 reached")}
            {props.receipt}
        </li>
    )
}