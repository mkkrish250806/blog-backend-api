import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors

# load dataset
data = pd.read_csv("data.csv")

# encode products
encoder = LabelEncoder()
data["product_encoded"] = encoder.fit_transform(data["product"])

# create user-product matrix
matrix = data.pivot_table(
    index="user_id",
    columns="product_encoded",
    aggfunc=len,
    fill_value=0
)

# train model
model = NearestNeighbors(metric="cosine")
model.fit(matrix)


def get_recommendations(user_id):
    if user_id not in matrix.index:
        return []

    user_vector = matrix.loc[user_id].values.reshape(1, -1)
    distances, indices = model.kneighbors(user_vector, n_neighbors=2)

    similar_user = matrix.index[indices.flatten()[1]]
    products = data[data["user_id"] == similar_user]["product"].tolist()

    return products