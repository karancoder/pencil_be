import requests

import csv

def addQuestionToDb():
    file = open("questions.csv")
    csvreader = csv.reader(file)
    header = next(csvreader)
    print(header)
    rows = []
    for row in csvreader:
        annotations = []
        for annotation in row[1:]:
            if annotation == "":
                break
            annotations.append(annotation)
        # print(len(annotations))
        # if len(annotations) > 5:
        #     print("Invalid")
        body = {"question_number": int(row[0]), "annotations": annotations}
        print(body)
        r = requests.post(url = "http://localhost:3000/questions", json = body )
    file.close()

def addTopicsToDb():
    file = open("topics.csv")
    topic_dict = {}
    csvreader = csv.reader(file)
    header = next(csvreader)
    print(header)
    rows = []
    for row in csvreader:
        annotations = []
        for i in range(len(row) - 1):
            annotation = row[i]
            childAnnotation = row[i + 1]
            if annotation == "":
                break
            if annotation in topic_dict.keys() and childAnnotation not in topic_dict[annotation]:
                topic_dict[annotation].append(childAnnotation)
            elif annotation not in topic_dict.keys():
                topic_dict[annotation] = []
                topic_dict[annotation].append(childAnnotation)

    for key in topic_dict.keys():
        print(key, ": ")
        for val in topic_dict[key]:
            print("---", val)
        body = {"annotation": key, "childAnnotations": topic_dict[key]}
        print(body)
        r = requests.post(url = "http://localhost:3000/topics", json = body )
    file.close()

addTopicsToDb()
addQuestionToDb()
