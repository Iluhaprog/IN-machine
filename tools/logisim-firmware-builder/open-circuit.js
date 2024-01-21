const exec = require('child_process').exec;

const JAVA_PATH =  'D:\\Apps\\Java\\jdk-20\\bin\\java';
const LOGISIM_PATH = ' D:\\Apps\\logisim-evolution\\app\\logisim-evolution-3.8.0-all.jar';
const PATH_TO_CIRCUIT = 'C:\\Users\\ilyan\\OneDrive\\Documents\\PC\\pc-in-logisim\\EPPROM_version\\cu-firmware\\test_build\\PC_with_ROM_CU_test_build.circ';

exec(`${JAVA_PATH} -jar ${LOGISIM_PATH} -u ${PATH_TO_CIRCUIT}`, function (err) {
    if (err) {
        console.log(err);
        return;
    }

    process.exit(0);
});

