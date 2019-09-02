images-owner-amazon.json:
	aws ec2 describe-images --owners amazon > $@

clean:
	rm -rf images-owner-amazon.json
