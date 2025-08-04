from pytrends.request import TrendReq

def get_trending_topics(region="global", limit=5):
    pytrends = TrendReq()
    pytrends.build_payload(kw_list=["AI", "technology"])
    trending_searches = pytrends.trending_searches(pn="united_states" if region.lower() == "us" else "global")
    return trending_searches.head(limit).tolist()