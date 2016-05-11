var fs = require('fs')
var readline = require('readline')
var stream = require('stream')
var util = require('util')
var path = require('path')

// arquivo que será lido
var logFile = path.resolve(__dirname, 'file.log')
// stream do arquivo de log
var instream = fs.createReadStream(logFile);
// stream das linhas lidas
var outstream = new stream;
var fileStream = readline.createInterface(instream, outstream);

// A cada linha do arquivo, incrementamos essa variável
var totalLines = 0

util.log('Começa a ler', logFile.split('/').pop())

console.time('reading log file')

// o evento line é emitido para cada linha do arquivo
fileStream.on('line', function(linhaDoArquivo) {
	 // Apenas segue, se a linha tiver a letra E
	if ( !/([e])/i.test(linhaDoArquivo) ) { return }

	// aqui você pode fazer o que quiser com
	// a linha do aqui
	console.log( linhaDoArquivo )

	// incrementa o número de linhas
	totalLines++;
});

// evento disparado quando geralmente
// depois que a ultima linha do arquivo
// é lida
fileStream.on('close', function() {
	util.log('closed')
	util.log('lines: ', totalLines)
	console.log('- '.repeat(10))
	util.log('file.log lido')

	// Para o timer aqui, para ver quanto tempo
	// demorou a ação
	console.timeEnd('reading log file')
});
